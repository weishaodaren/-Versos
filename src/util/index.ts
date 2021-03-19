const messageChannelFn = () => {
  const channel = new MessageChannel();
  const { port1, port2 } = channel;

  port1.onmessage = (event) => {
    console.log('from port2', event.data);
  };

  port2.onmessage = (event) => {
    console.log('from port1', event.data);
  };

  return { port1, port2 };
};

export { messageChannelFn };
