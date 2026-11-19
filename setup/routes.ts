export default function (routes) {
  return [
    { path: '/remote', component: () => import('../components/PhoneRemote.vue') },
    ...routes,
  ]
}
