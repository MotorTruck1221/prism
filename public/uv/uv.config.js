self.__uv$config = {
  // The prefix is where we "intercept" the request.
  prefix: "/uv/service/",
  //where Ultraviolet encodes & decodes the urls.
  encodeUrl: Ultraviolet.codec.xor.encode,
  decodeUrl: Ultraviolet.codec.xor.decode,
  //extra UV stuff
  handler: "/uv/uv.handler.js",
  client: "/uv/uv.client.js",
  bundle: "/uv/uv.bundle.js",
  config: "/uv/uv.config.js",
  sw: "/uv/uv.sw.js",
};
