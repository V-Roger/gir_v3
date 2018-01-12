export default process.env.NODE_ENV === 'lan' ? {
  baseUrl: 'http://192.168.1.12:8080',
  endpoints: {
    collections: 'api/collections/get',
  },
  token: 'a207df3402bcc7a580aedb7a20b97d',
} : {
  baseUrl: 'http://192.168.1.12:8080',
  endpoints: {
    collections: 'api/collections/get',
  },
  token: 'a207df3402bcc7a580aedb7a20b97d',
};
