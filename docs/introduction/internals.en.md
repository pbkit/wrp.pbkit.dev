## Resources

WRP has resources that are isolated for each particular purpose like the OSI-7
layer to provide a communication layer.

Sockets and channels are used to implement message communication.

- Socket: Transports binary data between the two platforms
- Channel: Transports data in form of message over the socket.

Guests and hosts are divided according to the purpose of using messages that are
transported over channels.

- Guest: Sends requests over the channel.
- Host: Processes requests from guests and sends responses.

Additionally, each platform (Web, iframe, iOS, Android) has a different form of
low-level API and different communication methods. So `Glue` exists for
implementing the socket in platform-specific way.

- Glue: Platform-specific code for implementing sockets.

Each resources should exist only one throughout the lifecycle of an application
that uses WRP. Data and messages are consumed without being shared across
resources. So, You must ensure the uniqueness of the socket or channel.

## Message

Messages over the channel are called WrpMessage, which is also defined as
Protocol Buffers and are en/decoded.\
[WrpMessage.proto](https://github.com/pbkit/wrp-ts/blob/main/src/wrp.proto)

### Types

The type of each message indicates the following situations:

- HostInitialize: When the host establishes a connection, it sends methods that
  the guest can request.
- HostError: Send if the host encounters an error.
- GuestReqStart: The guest initiates a request. Specify the id to identify the
  request and the desired method.
- GuestReqPayload: The guest sends the content (payload) of the request
  corresponding to a specific id.
- GuestReqFinish: Guest sent all the contents of the request.
- HostResStart: The host initiates a response.
- HostResPayload: The host sends the contents of the response.
- HostResFinish: The host sent all the contents of the response.
- GuestResFinish: The guest no longer wants a response.

Please refer to the image below to see what message types are delivered in a
large context flow.

[![](/wrp-message-type.png)](https://mermaid.live/edit#pako:eNptkcFSwyAQhl9lh6vJC3DoqRq8OE5z8MJlDathTIDCpjO103cXktRqlQMD_B__v7An0XlDQgrtEu0nch1tLb5HHLULGNl2NqBjUIAJXmJQPvFvpVmVZqIiqXqzaSQU7tFZtjjYT9LuyTOBP1AEVUHWW3IG8IB2wNeBYCTuvUnaDd4H7QCabHOnJMyuO9q3nCOLoOprwI7S93kuCWJ5QZq3ABenMppy6YfbMx4Hj2aRcyXL4pZ6sM6mvmgrsmSk4PNf_Q25qez_jBmqr9RNRp5EJUaKI1qTu3Iqihbc00hayLw0GD907tY5c1MwyHRvLPso5BsOiSqBE_v26DohOU50gdamrtT5CwcvqBU)

### Frame

WrpMessage changes to a new form as it is converted to binary data for delivery
over the socket. Record the length information when WrpMessage is encoded in
binary form at the beginning of the message 4 bytes because it is difficult to
know the beginning and end of the data when binary data is streamed.

<img
  alt="wrp channel packet diagram"
  src="https://kroki.io/packetdiag/svg/eNorSEzOTi1JyUxMV6jmUlBIzs8pz0wpyVCwVTA2sAYK5OWnpMZnpGamZ5QAxSzAYga6xlYKSr6pxcWJ6amGMXnBmVWpMXkaqXrpegqmmkogJSa6FihKAhIrc_ITU5SAUpa6hkYIOSNU7YYGEP2GxrpGyKoUkAwwAspZWino6elx1XIBAC0FNYs=">
