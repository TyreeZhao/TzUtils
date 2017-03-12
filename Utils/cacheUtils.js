
/**
 * Check if the updatedAt field inside state is superior than now + duration
 *
 * @param state {Map|object}
 * @param duration {moment.Duration}
 * @returns {boolean}
 */
export function isLocalCacheValid(state, duration = cacheConfig.local.duration) {
  const now = moment()

  if (!state) {
    return false
  }

  // could be a immutable Map
  if (Map.isMap(state)) {
    if (!state.get(updatedAtFieldName)) {
      return false
    }

    // expired
    if (state.get(updatedAtFieldName).add(duration).isBefore(now)) {
      return false
    }

    return true
  }

  // could be a normal object
  if (state.hasOwnProperty(updatedAtFieldName)) {
    if (!state[updatedAtFieldName]) {
      return false
    }

    // expired
    if (state[updatedAtFieldName].add(duration).isBefore(now)) {
      return false
    }

    return true
  }

  // no cases above, return false
  return false
}
