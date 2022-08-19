## 자원

WRP는 통신 레이어를 제공하기 위해 OSI-7 Layer와 비슷한 방식으로 특정 목적마다 분리된 자원을 가집니다.

메세지 통신을 구현하기 위한 목적으로는 소켓과 채널이 있습니다.

- 소켓: 두 플랫폼 간 바이너리 데이터를 송수신합니다.
- 채널: 소켓을 이용해 메세지 단위의 정보를 송수신합니다.

채널을 이용해 송수신할 수 있는 메세지를 사용하는 목적에 따라 게스트와 호스트가 나뉩니다.

- 게스트: 채널을 통해 요청을 전송합니다.
- 호스트: 게스트로부터 온 요청을 처리하고 응답을 전송합니다.

추가로, 각 플랫폼(Web, iframe, iOS, Android)은 제공하는 저수준 API의 형태와 통신 방법이 다르므로 이러한 플랫폼
종속적인 방법에 따라 소켓을 구성하는 Glue가 존재합니다.

- Glue: 소켓을 구현하기 위한 플랫폼 종속적인 코드를 일컫습니다.

이러한 자원들은 WRP를 사용하는 애플리케이션의 생명 주기 전체에 하나만 존재해야 합니다. iframe 소켓과 같은 특수한 상황을 제외하고는,
데이터/메세지가 여러 자원에 대해 공유되지 않고 소모되는 특성이 있으므로 소켓이나 채널의 유일성이 무조건 보장되어야 합니다.

## 메세지

채널을 통해 전달되는 메세지는 WrpMessage로 부르며, 이 메세지도 Protocol Buffers로 정의되어 인/디코딩됩니다.\
[WrpMessage.proto](https://github.com/pbkit/wrp-ts/blob/main/src/wrp.proto)

### 타입

각 메세지의 타입은 다음과 같은 상황을 나타냅니다.

- HostInitialize: 호스트가 연결 수립 시, 게스트가 요청할 수 있는 메소드들을 보냅니다.
- HostError: 호스트가 에러를 마주한 경우 보냅니다.
- GuestReqStart: 게스트가 요청을 시작합니다. 요청을 식별할 수 있는 id와 원하는 메소드를 지정합니다.
- GuestReqPayload: 게스트가 특정 id에 해당하는 요청의 내용(payload)을 보냅니다.
- GuestReqFinish: 게스트가 요청에 대한 모든 내용을 보냈습니다.
- HostResStart: 호스트가 응답을 시작합니다.
- HostResPayload: 호스트가 응답의 내용을 보냅니다.
- HostResFinish: 호스트가 응답에 대한 모든 내용을 보냈습니다.
- GuestResFinish: 게스트가 응답을 더 이상 원하지 않습니다.

큰 맥락 흐름에서 어떤 메세지 타입이 전달되는지 확인하려면 아래 이미지를 참고하세요.

[![](/wrp-message-type.png)](https://mermaid.live/edit#pako:eNptkcFSwyAQhl9lh6vJC3DoqRq8OE5z8MJlDathTIDCpjO103cXktRqlQMD_B__v7An0XlDQgrtEu0nch1tLb5HHLULGNl2NqBjUIAJXmJQPvFvpVmVZqIiqXqzaSQU7tFZtjjYT9LuyTOBP1AEVUHWW3IG8IB2wNeBYCTuvUnaDd4H7QCabHOnJMyuO9q3nCOLoOprwI7S93kuCWJ5QZq3ABenMppy6YfbMx4Hj2aRcyXL4pZ6sM6mvmgrsmSk4PNf_Q25qez_jBmqr9RNRp5EJUaKI1qTu3Iqihbc00hayLw0GD907tY5c1MwyHRvLPso5BsOiSqBE_v26DohOU50gdamrtT5CwcvqBU)

### 프레임

WrpMessage는 소켓에서 전달되기 위해 이진 데이터로 변환되면서 새로운 형태를 가집니다. 이진 데이터가 스트리밍되는 경우 데이터의 시작과
끝을 알기 어려우므로, 메세지의 시작 부분 4바이트에 WrpMessage가 이진 형태로 인코딩되었을 때의 길이 정보를 기록합니다.

<img
  alt="wrp channel packet diagram"
  src="https://kroki.io/packetdiag/svg/eNorSEzOTi1JyUxMV6jmUlBIzs8pz0wpyVCwVTA2sAYK5OWnpMZnpGamZ5QAxSzAYga6xlYKSr6pxcWJ6amGMXnBmVWpMXkaqXrpegqmmkogJSa6FihKAhIrc_ITU5SAUpa6hkYIOSNU7YYGEP2GxrpGyKoUkAwwAspZWino6elx1XIBAC0FNYs=">
