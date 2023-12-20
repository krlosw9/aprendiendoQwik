import { component$, useStylesScoped$ } from '@builder.io/qwik';
import { Form, routeAction$, zod$, z } from '@builder.io/qwik-city';

import styles from './login.css?inline';

export const useLoginUserAction = routeAction$((data, {cookie, redirect}) => {
  const {email, password} = data;

if(email === 'k@w.com' && password === '123456') {
    cookie.set('jwt', 'jwt_super_seguro', {secure: true, path: '/'});
    redirect(302, '/');
  }

  return {
    success: false
  }
}, zod$({
  email: z.string().email('Formato no válido'),
  password: z.string().min(6, 'Mínimo 6 letras')
}));

export default component$(() => {

  useStylesScoped$(styles);

  const action = useLoginUserAction();

  return (
    <Form action={action} class="login-form mt-10" >
      <div class="relative">
        <input name="email" type="text" placeholder="Email address" />
        <label for="email">Email Address</label>
      </div>
      <div class="relative">
        <input name="password" type="password" placeholder="Password" />
        <label for="password">Password</label>
      </div>
      <div class="relative">
        <button type='submit'>Ingresar</button>
      </div>

      {/* <p>
        { action.value?.success && (
          <code>Autenticado: Token {action.value.jwt}</code>
        ) }
      </p> */}

      <code>
        { JSON.stringify( action.value, undefined , 2 ) }
      </code>
    </Form>
  )
});