const END_POINT = "https://zl3m4qq0l9.execute-api.ap-northeast-2.amazonaws.com/dev";

export const request = async (nodeId) => {
    const targetURL = nodeId ? `${END_POINT}/${nodeId}` : END_POINT;
    try {
        const res = await fetch(targetURL);

        if (res.ok) {
            return res.json();
        }
    } catch (e) {
        throw e;
    }
}