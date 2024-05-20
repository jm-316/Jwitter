import { LuImage } from 'react-icons/lu';
import { toast } from 'react-toastify';
import React, { useContext, useState } from 'react';
import AuthContext from '../context/AuthContext';
import styles from './PostForm.module.scss';

export default function PostForm() {
  const [content, setContent] = useState<string>('');
  const [hashTag, setHashTag] = useState<string>('');
  const [tags, setTags] = useState<string[]>([]);
  const [imageFile, setImageFile] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const { user } = useContext(AuthContext);

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
        setImageFile(result as string);
      };
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const {
      target: { name, value },
    } = e;

    if (name === 'content') {
      setContent(value);
    }
  };

  const onChangeHashTag = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHashTag(e?.target.value?.trim());
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const eventTarget = e.currentTarget.value;

    if (e.keyCode === 32 && eventTarget.trim() !== '') {
      if (tags?.includes(eventTarget?.trim())) {
        toast.error('이미 같은 태그가 있습니다.');
      } else {
        setTags((prev) => (prev?.length > 0 ? [...prev, hashTag] : [hashTag]));
        setHashTag('');
      }
    }
  };

  const removeTag = (tag: string) => {
    setTags(tags?.filter((value) => value !== tag));
  };

  const handleDeleteImage = () => {
    setImageFile(null);
  };

  return (
    <form className={styles.postForm}>
      <div className={styles.postForm__content}>
        <div className={styles.postForm__contentBox}>
          <textarea
            className={styles.postForm__textarea}
            name="content"
            id="content"
            value={content}
            required
            placeholder="무슨 일이 일어나고 있나요?"
            onChange={onChange}
          />
          <div className={styles.postForm__hashtags}>
            <span className={styles.postForm__hashtags__outputs}>
              {tags?.map((tag) => (
                <span
                  className={styles.postForm__hashtagsTag}
                  key={tag}
                  onClick={() => removeTag(tag)}
                >
                  #{tag}
                </span>
              ))}
            </span>
            <input
              name="hashtag"
              id="hashtag"
              value={hashTag}
              className={styles.postForm__input}
              onChange={onChangeHashTag}
              onKeyUp={handleKeyUp}
              placeholder="해시태그 + 스페이스"
            />
          </div>
        </div>
      </div>
      <div className={styles.postForm__submitArea}>
        <div className={styles.postForm__imageArea}>
          <label htmlFor="file-input" className={styles.postForm__file}>
            <LuImage className={styles.postForm__fileIcon} />
          </label>
          <input
            type="file"
            name="file-input"
            id="file-input"
            accept="image/*"
            className={styles.hidden}
            onChange={handleFileUpload}
          />
          {imageFile && (
            <div className={styles.postForm__attachment}>
              <img src={imageFile} alt="attachment" width={100} height={100} />
              <button
                className={styles.postForm__clearBtn}
                type="button"
                onClick={handleDeleteImage}
              >
                삭제
              </button>
            </div>
          )}
        </div>

        <button className={styles.postForm__btn}>게시하기</button>
      </div>
    </form>
  );
}
