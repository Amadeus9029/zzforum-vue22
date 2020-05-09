const getters = {
  // sidebar: state => state.app.sidebar,
  // size: state => state.app.size,
  // device: state => state.app.device,
  // visitedViews: state => state.tagsView.visitedViews,
  // cachedViews: state => state.tagsView.cachedViews,
  user: state => state.user.user,
  token: state => state.user.token,
  loadMenus: state => state.user.loadMenus,
  userUrlMap: state => state.user.userUrlMap,
  resource: state => state.resource.resource,
  currentResource: state => state.resource.currentResource,
  currentResourcePath: state => state.resource.currentResourcePath,
  sourceArray: state => state.resource.sourceArray,
  recentEditedResource: state => state.resource.recentEditedResource,
  publishedStrategy: state => state.publishStrategy.publishedStrategy,
  // avatar: state => state.user.avatar,
  // name: state => state.user.name,
  // introduction: state => state.user.introduction,
  roles: state => state.user.roles,
  permission_routers: state => state.permission.routers,
  // errorLogs: state => state.errorLog.logs
}
export default getters
