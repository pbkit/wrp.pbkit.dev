## WRP에서 통신하는 방법

Web에서 WRP를 이용한 통신을 하는 방법은 두 가지가 있습니다.

- 앱 플랫폼에서 제공하는 전역 객체 사용: 앱과 웹뷰가 통신할 때 웹뷰가 사용하는 방식입니다.
- iframe의 postMessage 사용: 앱과 웹뷰가 통신하는 상황을 모방해야 하는 테스트를 구현하기에 적합한 방식입니다.

따라서 이번 예제에서는 iframe으로 앱과 웹뷰를 모방하고, 부모 페이지에서 서버를, iframe 페이지에서 클라이언트를 구현해보겠습니다.

## 클라이언트(게스트) 만들기

일단 적당한 `Client.tsx`를 준비해줍니다. 앞서 만든 `proto`와 `generated` 디렉토리가 있는 프로젝트 루트라고
가정하겠습니다.

```tsx
import React from "react";

const Client = () => {
  return (
    <>
      <div>Hello world!</div>
    </>
  );
};

export default Client;
```

클라이언트를 만들기 위해서는 `useClientImpl` hook을 사용해야 합니다.

import한 후 `clientImpl`을 준비해주세요.

```tsx
import React from "react";
+ import { useClientImpl } from "@pbkit/wrp-jotai/parent";

const Client = () => {
+  const clientImpl = useClientImpl();
  return (
    <>
```

`useClientImpl`을 client를 구현하는 데에 필요한 소켓과 채널 같은 저수준 자원들을 만든 뒤, `clientImpl`을
반환합니다.

client는 어떤 것(서비스)을 어떻게(통신 방법) 보낼지 알아야 만들 수 있습니다. `clientImpl`은 통신 방법(WRP 채널)에 대한
정보만 알고 있는 client의 일부분입니다. 서비스가 담고 있는 메소드 정보들을 넣어주면 완성된 client를 얻을 수 있는 것입니다. 서비스
정보는 우리가 이전 단계에서 생성한 코드에서 얻어올 수 있습니다.

```tsx
import React, { useMemo } from "react";
import { useClientImpl } from "@pbkit/wrp-jotai/parent";
+ import { createServiceClient } from '../generated/services/pbkit/wrp/example/WrpExampleService';

const Client = () => {
  const clientImpl = useClientImpl();
+  const serviceClient = useMemo(() => {
+    if (!clientImpl) return;
+    return createServiceClient(clientImpl);
+  }, [clientImpl]);
  return (
    <>
```

생성된 서비스 코드에서 `createServiceClient`를 이용해 `serviceClient`를 만들었습니다.
`serviceClient`를 입력해보면 우리가 정의한 두 rpc가 추론되는 것을 확인할 수 있습니다!

이제 버튼을 추가하고, 버튼을 눌렀을 때 `GetTextValue`를 호출한 뒤 받은 값으로 alert를 띄워 봅시다.

```tsx
const Client = () => {
  const clientImpl = useClientImpl();
  const serviceClient = useMemo(() => {
    if (!clientImpl) return;
    return createServiceClient(clientImpl);
  }, [clientImpl]);
+   const onClick = async () => {
+     alert((await serviceClient?.getTextValue({}))?.text);
+   };
  return (
    <>
+       <button onClick={onClick}>Click me!</button>
    </>
  );
};
```

버튼을 눌러보면 undefined alert이 뜨게 됩니다. rpc를 제공하는 서버(호스트)가 없기 때문에 당연한 결과입니다. 이제 호스트를
구현해보겠습니다.
