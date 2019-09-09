export const loginValidator = async () => {
  try {
    const savedSession = await getSession();
    if (savedSession !== false) return (window.location.href = "/");
  } catch {
    return false;
  }
};

/**
 * @desc  get window.sessionStorage
 * @return {Promise<Resolve, Reject>}
 */
export const getSession = async () => {
  try {
    const savedSession = await window.sessionStorage.getItem("foodishSession");
    if (typeof savedSession !== "undefined" && savedSession !== null) return savedSession;
  } catch {
    return false;
  }
};
