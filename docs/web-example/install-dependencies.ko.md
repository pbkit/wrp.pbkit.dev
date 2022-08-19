TypeScript 패키지는 세개의 NPM 라이브러리들로 구성되어 있습니다.

- `@pbkit/wrp`: WRP의 저수준 자원들(소켓)이 구현되어 있는 라이브러리입니다.
- `@pbkit/wrp-react`: WRP의 고수준 자원들(서버, 채널)을 React 생명 주기에 맞춰 생성하는 hook들이 포함되어
  있습니다.
- `@pbkit/wrp-jotai`: WRP의 자원들은 생명 주기에 하나의 자원만 존재함이 보장되어야 하기 때문에, 이 조건을 쉽게 만족할 수
  있도록 상태 관리 라이브러리인 `jotai`를 사용해 추상화한 라이브러리입니다.

`wrp-react`가 제공하는 hook들로는 자원의 유일성을 보장하기 힘드므로 `wrp-jotai` 라이브러리를 사용하거나 별도의 상태 관리
라이브러리로 감싸는 것을 추천합니다. 본 예제에서는 `wrp-jotai`를 사용하도록 하겠습니다.

## TypeScript 패키지 설치

### yarn으로 설치하기

```bash
yarn add @pbkit/wrp @pbkit/wrp-react @pbkit/wrp-jotai
```

만약 [jotai](https://jotai.org)를 설치하지 않았다면 jotai도 함께 설치해주세요.

```bash
yarn add jotai
```

다음으로는 예제에 사용할 스키마를 정의하고, 스키마를 바탕으로 코드를 생성해봅시다.
