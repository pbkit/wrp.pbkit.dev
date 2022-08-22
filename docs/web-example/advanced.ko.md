## 서버에서 React 상태 사용하기

### 함수에서 React 상태 사용하기

요청이 들어온 경우 실행되는 함수 내에서, 서버가 실행되고 있는 React 내부의 상태 값을 사용하고 싶은 경우가 있습니다. 그런 경우
`useWrpServer`의 두번째 인자 값을 사용하고, 함수 내에서 `res`와 함께 `getState`를 인자로부터 받아오세요.

```tsx
const Server = () => {
  const [state, setState] = useState();
  useWrpServer(channel, { state }, [
    [
      methodDescriptors.getTextValue,
      ({ res, getState }) => {
        const { state } = getState();
        res.header({});
        res.send({ text: "hello" });
        res.end({});
      },
    ],
  ]);
};
```

`getState`는 실행되는 시점의 값을 받아와 반환해줍니다. 함수 내부에서 `getState`의 호출 시기를 조절하면 지속적으로 변하는 값을
원하는 시점에서 가져올 수 있습니다.

### React 상태가 변할 때마다 응답 보내기

Streaming rpc의 경우 React 상태 값이 변할 때마다 응답을 보내고 싶은 경우가 있습니다. 이런 경우 함수 내에서
`stateChanges`를 사용하세요.

```tsx
const Server = () => {
  const [state, setState] = useState();
  useWrpServer(channel, { state }, [
    [
      methodDescriptors.getSliderValue,
      ({ req, res, stateChanges }) => {
        res.header({});
        const value = getState().state;
        const off = stateChanges.on("state", (value) => res.send({ value }));
        req.metadata?.on("cancel-response", teardown);
        req.metadata?.on("close", teardown);
        function teardown() {
          off();
          res.end({});
        }
      },
    ],
  ]);
};
```

위의 예제는 여러 응답을 보낼 수 있는 Server streaming rpc를 구현한 것입니다. `state`가 변할 때마다 값을 보내며,
`close`(연결이 끊어진 경우), `cancel-response`(클라이언트에서 응답을 그만 보내라는 경우) 이벤트가 오면 상태에 대한
구독을 중지하고 응답을 마무리합니다.
