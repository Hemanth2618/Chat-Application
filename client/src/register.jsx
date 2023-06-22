export default function Register() {
    return (
        <div className="bg-blue-50 h-screen">
            <form className="w-64 mx-auto">
                <input type="text" placeholder="username" className="block w-full rounded-sm p-2"/>
                <input type="password" placeholder="password" className="block w-full rounded-sm"/>
                <button className="bg-blue-500 text-white block w-full rounded-sm">Register</button>
            </form>
        </div>
    );
}