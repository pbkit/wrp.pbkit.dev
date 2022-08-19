## 스키마 정의하기

WRP를 사용하기 위해서는 클라이언트들이 전달할 메세지와 사용할 서비스가 정의되어 있는 Protocol Buffers 스키마 파일이 필요합니다.
예제에서 사용할 간단한 스키마를 준비했습니다.

`proto/Example.proto` 같은 곳에 저장해주세요.

```protobuf
syntax = "proto3";
package pbkit.wrp.example;

service WrpExampleService {
  rpc GetTextValue(GetTextValueRequest) returns (GetTextValueResponse);
  rpc GetSliderValue(GetSliderValueRequest) returns (stream GetSliderValueResponse);
}

message GetTextValueRequest {}
message GetTextValueResponse {
  string text = 1;
}
message GetSliderValueRequest {}
message GetSliderValueResponse {
  int32 value = 1;
}
```

스키마에는 4개의 메세지와 2개의 rpc가 구현되어 있는 서비스(WrpExampleService)가 선언되어 있습니다.

- GetTextValue: 서버(호스트)로부터 하나의 text 값을 받는 rpc입니다.
- GetSliderValue: 서버(호스트)로부터 value 값을 여러번 받는 rpc입니다. GetTextValue와 달리 응답이 여러번 올
  수 있음을 기억하세요.

이제부터 만들 예제는 WrpExampleService의 GetTextValue, GetSliderValue를 호출해 값을 받아오는
클라이언트(게스트)와 게스트의 요청에 따라 값을 전달해주는 서버(호스트)를 구현하도록 하겠습니다.

## 코드 생성하기

일단, 정의한 스키마를 바탕으로 코드를 생성해줍니다.

아래의 `pb gen ts` 커맨드는 Protocol Buffers 파일을 읽어 TypeScript 코드를 생성해줍니다.

```bash
pb gen ts --entry-path=proto --ext-in-import="" --out-dir=generated
```

`entry-path`는 스키마를 저장할 디렉토리 경로로 지정해주세요.\
`out-dir`는 생성된 코드가 저장될 디렉토리 경로로 지정해주세요. 예제에서는 `generated`를 사용하겠습니다.

`generated`에 messages, runtime, services 폴더가 생겼다면 성공입니다.

다음으로는 생성된 코드를 이용해 클라이언트(게스트)를 만들어보겠습니다.
