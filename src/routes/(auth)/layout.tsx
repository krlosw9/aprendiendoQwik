import { Slot, component$, useStylesScoped$ } from '@builder.io/qwik';
import styles from './auth-layout.css?inline';

// https://freefrontend.com/tailwind-forms/
export default component$(() => {

    useStylesScoped$(styles);

    return (
        <div class="login-main">
            <div class="login-bg">
                <div
                    class="login-bg-gradient">
                </div>
                <div class="login-white-bg">
                    <div class="max-w-md mx-auto">
                        <div>
                            <h1 class="login-title">Login Form</h1>
                        </div>
                        <div class="login-content">
                            <Slot />
                        </div>
                        <div class="w-4/5 my-0 mx-auto text-sm">
                            <h3 class="text-gray-700">Email: usuario@prueba.com</h3>
                            <h3 class="text-gray-700 mt-1.5">Password: 123456</h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
});