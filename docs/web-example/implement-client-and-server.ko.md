## 자식 윈도우(웹뷰)에서 클라이언트와 서버 구현하기

자식 윈도우에서는 `@pbkit/wrp-jotai/parent`가 제공하는 `useChannel`, `useClientImpl`만 사용하면
WRP 자원을 얻을 수 있습니다.

### 클라이언트 구현

pbkit을 통해 생성한 서비스 코드 `createServiceClient`에 `clientImpl`을 제공하면 됩니다.

```tsx
import { useClientImpl } from "@pbkit/wrp-jotai/parent";
import { createServiceClient } from "../generated/services/..."

const Client = () => {
  const clientImpl = useClientImpl();
  const serviceClient = useMemo(() => {
    if (!clientImpl) return;
    return createServiceClient(clientImpl);
  }, [clientImpl]);
  const onClick = async () => {
    await serviceClient?.getTextValue({}))?.text;
  };
```

### 서버 구현

pbkit을 통해 생성한 서비스 코드 `methodDescriptors`와 `channel`을 `useWrpServer`에 제공하면 됩니다.

```tsx
import { useWrpServer } from "@pbkit/wrp-react";
import { useChannel } from "@pbkit/wrp-jotai/parent";
import { methodDescriptors } from "../generated/services/...";

const Server = () => {
  const channel = useChannel();
  useWrpServer(channel, {}, [
    [
      methodDescriptors.getTextValue,
      ({ res }) => {
        res.header({});
        res.send({ text: "hello" });
        res.end({});
      },
    ],
  ]);
```

## 부모 윈도우(앱)에서 클라이언트와 서버 구현하기

부모 윈도우에서는 `@pbkit/wrp-jotai/pwasa`와 `@pbkit/wrp-jotai/iframe`을 이용해 WRP 자원들을 만들 수
있습니다. 각각 `createPrimitiveWrpAtomSetAtom`과 `useIframeWrpAtomSetUpdateEffect`를
불러와서 아래와 같이 만들어주세요.

```tsx
import { useIframeWrpAtomSetUpdateEffect } from "@pbkit/wrp-jotai/iframe";
import { createPrimitiveWrpAtomSetAtom } from "@pbkit/wrp-jotai/pwasa";

const pwasa = createPrimitiveWrpAtomSetAtom();

const Component = () => {
  const { iframeRef } = useIframeWrpAtomSetUpdateEffect(pwasa);
  return <iframe ref={iframeRef} />;
};
```

위와 같이 `pwasa`를 업데이트한 뒤, `@pbkit/wrp-jotai/pwasa`에서 `useChannel`,
`useClientImpl`을 이용해 `channel`과 `clientImpl`을 얻을 수 있습니다.

### 클라이언트 구현

pbkit을 통해 생성한 서비스 코드 `createServiceClient`에 `clientImpl`을 제공하면 됩니다.

```tsx
import { useIframeWrpAtomSetUpdateEffect, useClientImpl } from "@pbkit/wrp-jotai/iframe";
import { createPrimitiveWrpAtomSetAtom } from "@pbkit/wrp-jotai/pwasa";

const pwasa = createPrimitiveWrpAtomSetAtom();

const Client = () => {
  const { iframeRef } = useIframeWrpAtomSetUpdateEffect(pwasa);
  const clientImpl = useClientImpl();
  const serviceClient = useMemo(() => {
    if (!clientImpl) return;
    return createServiceClient(clientImpl);
  }, [clientImpl]);
  const onClick = async () => {
    await serviceClient?.getTextValue({}))?.text;
  };
  return <iframe ref={iframeRef} />;
```

### 서버 구현

pbkit을 통해 생성한 서비스 코드 `methodDescriptors`와 `channel`을 `useWrpServer`에 제공하면 됩니다.


```tsx
import { useIframeWrpAtomSetUpdateEffect, useChannel } from "@pbkit/wrp-jotai/iframe";
import { createPrimitiveWrpAtomSetAtom } from "@pbkit/wrp-jotai/pwasa";
import { methodDescriptors } from "../generated/services/...";

const pwasa = createPrimitiveWrpAtomSetAtom();

const Server = () => {
  const { iframeRef } = useIframeWrpAtomSetUpdateEffect(pwasa);
  const channel = useChannel();
  useWrpServer(channel, {}, [
    [
      methodDescriptors.getTextValue,
      ({ res }) => {
        res.header({});
        res.send({ text: "hello" });
        res.end({});
      },
    ],
  ]);
  return <iframe ref={iframeRef} />;
```
