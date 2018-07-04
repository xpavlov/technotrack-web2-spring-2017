

export default function getCentrifugeConfig() {
    let data = document.querySelector('#centrifuge').dataset || {};
    return {
        url: data.url,
        user: data.user,
        timestamp: data.timestamp,
        token: data.token,
    }
}