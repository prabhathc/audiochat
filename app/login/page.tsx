export default function Login() {
    return (
        <form action="/auth/login" method="post">
            <label htmlFor="email">Email</label>
            <input name="email" type="email" />
            <label htmlFor="password">Password</label>
            <input type="password" name="password" />
            <button type="submit">Login</button>
        </form>
    );
}
