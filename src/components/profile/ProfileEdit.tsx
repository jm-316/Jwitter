import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { FaUserCircle } from 'react-icons/fa';
import React, { useContext, useEffect, useState } from 'react';
import Header from '../Header';
import Search from '../search/Search';
import AuthContext from '../context/AuthContext';
import { deleteImage, updatedProfile, uploadImage } from '../../api/firebase';
import { getErrorMessage } from '../../util/error';
import styles from './ProfileEdit.module.scss';

export default function ProfileEdit() {
  const [displayName, setDisplayName] = useState<string>('');
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = e;

    setDisplayName(value);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { files },
    } = e;

    const file = files?.[0];
    if (file) {
      const fileReader = new FileReader();
      fileReader?.readAsDataURL(file);

      fileReader.onloadend = (e: ProgressEvent<FileReader>) => {
        const { result } = e?.currentTarget as FileReader;
        setImageUrl(result as string);
      };
    }
  };

  useEffect(() => {
    if (user?.photoURL) {
      setImageUrl(user?.photoURL);
    }

    if (user?.displayName) {
      setDisplayName(user?.displayName);
    }
  }, [user?.photoURL, user?.displayName]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      let newImageUrl = '';

      if (user && imageUrl && imageUrl !== user.photoURL) {
        if (user.photoURL) {
          await deleteImage(user.photoURL);
        }
        newImageUrl = await uploadImage(user.uid, imageUrl);
      } else if (user && !user.photoURL && imageUrl) {
        newImageUrl = await uploadImage(user.uid, imageUrl);
      }

      if (user) {
        await updatedProfile(user, displayName, newImageUrl);
      }

      toast.success('프로필이 업데이트 되었습니다.');
      navigate('/profile');
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      toast.error(errorMessage);
    }
  };

  return (
    <>
      <div className={styles.home}>
        <div className={styles.profile__editContainer}>
          <Header />
          <form className={styles.editForm} onSubmit={onSubmit}>
            <div className={styles.editForm__flex}>
              <div className={styles.editForm__imgBox}>
                {imageUrl ? (
                  <img src={imageUrl} className={styles.editForm__img} />
                ) : (
                  <FaUserCircle className={styles.editForm__imgIcon} />
                )}

                <label
                  htmlFor="file-input"
                  className={styles.editForm__img__label}
                >
                  변경하기
                </label>
                <input
                  type="file"
                  accept="image/*"
                  name="file-input"
                  id="file-input"
                  className={styles.hidden}
                  onChange={handleFileUpload}
                />
              </div>
              <div className={styles.editForm__profile}>
                <input
                  type="text"
                  name="displayName"
                  className={styles.editForm__profile__input}
                  placeholder="user"
                  onChange={onChange}
                  value={displayName}
                />
                <div className={styles.editForm__profile__email}>
                  {user?.email}
                </div>
              </div>
            </div>
            <div className={styles.editForm__submitArea}>
              <button className={styles.editForm__btn} type="submit">
                수정
              </button>
            </div>
          </form>
        </div>
      </div>
      <Search isHome={true} />
    </>
  );
}
