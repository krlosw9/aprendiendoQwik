import { Slot, component$, useStylesScoped$ } from '@builder.io/qwik';
import styles from './auth-layout.css?inline';

// https://freefrontend.com/tailwind-forms/
export default component$(() => {

    useStylesScoped$(styles);

    return (
        <div class="login-main">
            <div class="login-bg">
                <div
                    class="login-bg-gradient" style={{width: "80%", margin: "0 auto", borderRadius: "1.5rem"}}>
                </div>
                <div class="login-white-bg" style={{width: "90%", margin: "0 auto", borderRadius: "1.5rem"}}>
                    <div class="max-w-md mx-auto">
                        <div>
                            <h1 class="login-title">Login Form</h1>
                        </div>
                        <div class="login-content">
                            <Slot />
                        </div>
                        <div class="w-4/5 md:w-full my-0 mx-auto">
                            <h3 class="text-sm text-gray-700">Email: usuario@prueba.com</h3>
                            <h3 class="text-sm text-gray-700 mt-1.5">Password: 123456</h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
});