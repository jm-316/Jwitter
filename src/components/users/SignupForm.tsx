import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { createUser, socialLogin } from '../../api/firebase';
import { getErrorMessage } from '../../util/error';
import styles from './SingupForm.module.scss';

export default function SignupForm() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordConfirm, setPasswordConfirm] = useState<string>('');
  const [error, setError] = useState<string>('');

  const navigate = useNavigate();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    const emailRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const passwordRegEx = /^[A-Za-z0-9]{8,20}$/;

    if (name === 'email') {
      setEmail(value);

      const isValidEmail = value?.match(emailRegex);

      setError(isValidEmail ? '' : '올바른 이메일이 아닙니다.');
    }

    if (name === 'password') {
      setPassword(value);

      const isValidPassword = value?.match(passwordRegEx);

      setError(
        isValidPassword
          ? ''
          : '비밀번호는 영문 대소문자, 숫자를 혼합하여 8~20자로 입력해주세요..',
      );

      if (passwordConfirm?.length > 0 && value !== passwordConfirm) {
        setError('비밀번호와 값이 다릅니다. 다시 확인해주세요');
      }
    }

    if (name === 'password_confirm') {
      setPasswordConfirm(value);

      const isValidPasswordConfirm = value !== password;

      setError(
        isValidPasswordConfirm
          ? '비밀번호와 값이 다릅니다. 다시 확인해주세요'
          : '',
      );
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await createUser(email, password);
      toast.success('성공적으로 회원가입이 되었습니다.', {
        theme: 'dark',
      });
      navigate('/');
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      toast.error(errorMessage, {
        theme: 'dark',
      });
    }
  };
  const onClickSocialLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const { name } = e.currentTarget;

    try {
      await socialLogin(name);
      toast.success('로그인 되었습니다.', {
        theme: 'dark',
      });
      navigate('/');
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      toast.error(errorMessage, {
        theme: 'dark',
      });
    }
  };
  return (
    <form className={`${styles.form} ${styles.formLg}`} onSubmit={onSubmit}>
      <div className={styles.form__title}>회원가입</div>
      <div className={styles.form__block}>
        <label htmlFor="email">이메일</label>
        <input
          type="text"
          name="email"
          id="email"
          required
          value={email}
          onChange={onChange}
        />
      </div>
      <div className={styles.form__block}>
        <label htmlFor="password">비밀번호</label>
        <input
          type="password"
          name="password"
          id="password"
          required
          value={password}
          onChange={onChange}
        />
      </div>
      <div className={styles.form__block}>
        <label htmlFor="password_confirm">비밀번호 확인</label>
        <input
          type="password"
          name="password_confirm"
          id="password_confirm"
          required
          value={passwordConfirm}
          onChange={onChange}
        />
      </div>
      {error && error?.length > 0 && (
        <div className={styles.form__block}>
          <div className={styles.form__error}>{error}</div>
        </div>
      )}
      <div className={styles.form__block}>
        이미 계정이 있으신가요?
        <Link to="/users/login" className={styles.form__link}>
          로그인하기
        </Link>
      </div>
      <div className={styles.form__blockLg}>
        <button type="submit" className={styles.form__btnSubmit}>
          회원가입
        </button>
      </div>
      <div className={styles.form__block}>
        <button
          type="button"
          className={styles.form__btnGoogle}
          name="google"
          onClick={onClickSocialLogin}
        >
          구글로 회원가입하기
        </button>
      </div>
      <div className={styles.form__block}>
        <button
          type="button"
          className={styles.form__btnGithub}
          name="github"
          onClick={onClickSocialLogin}
        >
          깃허브로 회원가입하기
        </button>
      </div>
    </form>
  );
}
