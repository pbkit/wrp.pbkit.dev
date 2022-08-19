## 서버(호스트) 구현하기

이전 단계에서 만든 클라이언트(게스트)에 rpc를 제공해줄 서버(호스트)를 만들어 보겠습니다.

이전에 클라이언트를 만들 때는 iframe 통신에 대한 고민을 할 필요가 없었습니다. iframe 내부의 페이지는
`window.parent.postMessage`를 이용해 부모 페이지에 접근하여 메세지를 보낼 수 있기 때문입니다. 반면 부모 페이지
입장에서는 전역 객체를 통해 iframe element를 접근할 수 없으므로 두 경우를 신경써줘야 합니다.

따라서 iframe 구조에서의 부모의 경우 HTMLIframeElement를 받아 소켓을 구성하는 특수한 소켓을 사용해야 합니다.

적당한 `Server.tsx`를 준비해주세요.

```tsx
import React from "react";

const Server = () => {
  return (
    <>
      <iframe src="/client" />
    </>
  );
};

export default Server;
```

서버를 만들기 위해서는 `createPrimitiveWrpAtomSetAtom` 함수를 이용해 WRP 자원들을 담을 jotai atom을
생성해야 합니다. 이 atom의 이름을 줄여 `pwasa`라고 부르고 있습니다. (다른 엄청난 의미는 없습니다)

```tsx
import React from "react";
+ import {createPrimitiveWrpAtomSetAtom} from "@pbkit/wrp-jotai/pwasa";

+ const pwasa = createPrimitiveWrpAtomSetAtom();
```

다음으로는 `useIframeWrpAtomSetUpdateEffect` hook을 이용해 React 컴포넌트 생명 주기 내에서 iframe
element으로 WRP 자원을 만들고 `pwasa`를 업데이트 해주어야 합니다.

```tsx
import React from "react";
import { createPrimitiveWrpAtomSetAtom } from "@pbkit/wrp-jotai/pwasa";
import { useIframeWrpAtomSetUpdateEffect } from "@pbkit/wrp-jotai/iframe";

const pwasa = createPrimitiveWrpAtomSetAtom();

const Server = () => {
+   const { iframeRef } = useIframeWrpAtomSetUpdateEffect(pwasa);
  return (
    <>
+       <iframe ref={iframeRef} src="/client" />
    </>
  );
};
```

이제 iframeRef를 등록했으니 WRP 자원들을 담은 atom인 `pwasa`가 업데이트 될 것입니다.

`pwasa`는 WRP 자원을 atom들로 담고 있기 때문에 자원을 얻기 위한 유틸 hook들도 제공합니다. 이 hook을 이용해 채널을
가져오겠습니다.

```tsx
import React from "react";
+ import { createPrimitiveWrpAtomSetAtom, channel } from "@pbkit/wrp-jotai/pwasa";
import { useIframeWrpAtomSetUpdateEffect } from "@pbkit/wrp-jotai/iframe";

const pwasa = createPrimitiveWrpAtomSetAtom();

const Server = () => {
  const { iframeRef } = useIframeWrpAtomSetUpdateEffect(pwasa);
+   const channel = useChannel(pwasa);
  return (
    <>
      <iframe ref={iframeRef} src="/client" />
    </>
  );
};
```

이제 `useWrpServer` hook을 이용해 채널로 서버를 구현할 수 있습니다. 이전 단계의 client와 마찬가지로 서버를 구현하는
데에도 통신 방법과 서비스 정보가 필요합니다. 통신 방법에 해당하는 채널이 이미 준비되어 있으니, 스키마를 통해 생성된 코드를 이용해 서비스
정보를 채워넣으면 됩니다. 이 서비스에 있는 rpc method 정보를 `methodDescriptor` 라고 부릅니다.

```tsx
import React from "react";
import { createPrimitiveWrpAtomSetAtom, channel } from "@pbkit/wrp-jotai/pwasa";
import { useIframeWrpAtomSetUpdateEffect } from "@pbkit/wrp-jotai/iframe";
+ import { useWrpServer } from "@pbkit/wrp-react";
+ import { methodDescriptors } from "../generated/services/pbkit/wrp/example/WrpExampleService";

const pwasa = createPrimitiveWrpAtomSetAtom();

const Server = () => {
  const { iframeRef } = useIframeWrpAtomSetUpdateEffect(pwasa);
  const channel = useChannel(pwasa);
+   useWrpServer(channel, {}, [
+     [
+       methodDescriptors.getTextValue,
+       ({ res }) => {
+         res.header({});
+         res.send({ text: "hello" });
+         res.end({});
+       }
+     ]
+   ]);
  return (
    <>
      <iframe ref={iframeRef} src="/client" />
    </>
  );
};
```

`useWrpServer`에 있는 세 번째 인자에 주목해주세요. 세 번째 인자에는 `[methodDescriptor, function]`로 된
메소드 구현의 배열을 받습니다. 각 요청이 올때마다, 알맞은 `methodDescriptor`의 등록된 함수가 실행되게 됩니다. 함수 에는
`res` 객체가 전달되며 `res`를 통해 응답의 헤더, 내용(payload), 마지막을 정할 수 있습니다.
