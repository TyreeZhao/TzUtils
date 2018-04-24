class Permission {
  constructor() {
    this.PermissionAccepted = false
  }

  loopChildren(userPermissionkey, lastChildren, rootKeys = [], purpose) {
    if (this.PermissionAccepted) {
      return true
    }
    if (lastChildren.length > 0) {
      for (let i = 0; i < lastChildren.length; i++) {
        if (lastChildren[i].key === purpose) {
          for (let k of rootKeys) {
            if (k === userPermissionkey) {
              this.PermissionAccepted = true
              return true
            }
          }
        }
        //如果children再有children的...
        if (lastChildren[i].children.length > 0) {
          rootKeys.push(lastChildren[i].key)
          this.PermissionAccepted = this.loopChildren(userPermissionkey, lastChildren[i].children, rootKeys, purpose)
        }
      }
      return false
    }
    return false
  }

  onCheck(purpose, PermissionList) {
    if (!PermissionList || PermissionList.size === 0) {
      return false
    }
    var PermissionAccepted = false
    // 遍历 ⎡当前用户的权限列表⎦
    for (let p of PermissionList) {
      // 如果 ⎡当前用户的权限列表⎦ 中某个key直接等于期望权限，直接返回 true
      if (p.get('key') === purpose) {
        return true
      } else {
        // 如果不直接等于，去找期望权限是否是 ⎡当前用户的权限列表⎦ 中某个权限的 children 权限，也反 true
        for (let treeItem of PermissionTree) {
          // 其根权限下有 children时，去遍历 children 权限列表
          // 如果期望权限是当前用户 rootKey 下的 children 权限，返回 true
          PermissionAccepted = this.loopChildren(p.get('key'), treeItem.children, new Array(treeItem.key), purpose)
          if (PermissionAccepted) {
            this.PermissionAccepted = false
            return true
          }
        }
      }
    }
    return false
  }
}

export const PermissionUtils = new Permission()
