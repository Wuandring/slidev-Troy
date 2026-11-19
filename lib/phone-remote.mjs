export function makeRemoteUrl(base, peer, key) {
  const url = new URL('remote', base);
  url.hash = new URLSearchParams({ peer, key }).toString();
  return url.href;
}

export function readPairing(hash) {
  const params = new URLSearchParams(hash.replace(/^#/, ''));
  const peer = params.get('peer');
  const key = params.get('key');
  return peer && /^[a-zA-Z0-9-]{1,100}$/.test(peer) && /^[a-f0-9]{32}$/.test(key)
    ? { peer, key } : null;
}

export function commandReceiver(key, navigate) {
  let lastSequence = 0;
  return (message) => {
    if (!message || message.key !== key || message.type !== 'navigate'
      || !['next', 'prev'].includes(message.action)
      || !Number.isSafeInteger(message.sequence) || message.sequence <= lastSequence)
      return false;
    lastSequence = message.sequence;
    navigate(message.action);
    return true;
  };
}
