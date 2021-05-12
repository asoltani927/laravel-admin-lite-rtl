export default function (err, auth) {
    try {
        if (err.response.status === 301 || err.response.status === 302) {
            document.location.href = '/'
        } else if (auth && err.response.status === 401) {
            document.location.href = '/login'
        }
        return err.response.data.message
    } catch (e) {
        console.log('----------------------------------')
        console.log(err)
        console.log('----------------------------------')
    }
}
