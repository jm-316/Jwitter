import { toast } from 'react-toastify';
import { LuImage } from 'react-icons/lu';
import { useNavigate, useParams } from 'react-router';
import { useContext, useEffect, useState } from 'react';
import Header from '../Header';
import AuthContext from '../context/AuthContext';
import { getErrorMessage } from '../../util/error';
import {
  deleteImage,
  getPost,
  updatePost,
  uploadImage,
} from '../../api/firebase';
import { PostProps } from '../../type';
import Search from '../search/Search';
import styles from './PostForm.module.scss';

export default function PostEdit() {
  const [data, setData] = useState<PostProps | null>(null);
  const [content, setContent] = useState<string>('');
  const [hashTag, setHashTag] = useState<string>('');
  const [tags, setTags] = useState<string[]>([]);
  const [imageFile, setImageFile] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const { user } = useContext(AuthContext);
  const params = useParams();
  const navigate = useNavigate();

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

  useEffect(() => {
    if (params?.id) {
      getPost(params.id, setData);
    }
  }, [params?.id]);

  useEffect(() => {
    if (data) {
      setContent(data?.content);
      setTags(data?.hashTags || []);
      setImageFile(data?.imageUrl || '');
    }
  }, [data]);

  const onSubmit = async (e: React.FocusEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (!data) return;
      if (!user) return;

      let imageUrl = data.imageUrl || '';
      if (imageFile && user && imageFile !== data.imageUrl) {
        if (data?.imageUrl) {
          await deleteImage(data?.imageUrl);
        }
        imageUrl = await uploadImage(user.uid, imageFile);
      }

      await updatePost(user, data, content, tags, imageUrl);
      navigate(`/posts/${data?.id}`);
      toast.success('게시글을 수정했습니다.');
      setImageFile(null);
      setIsSubmitting(false);
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      toast.error(errorMessage);
    }
  };

  return (
    <>
      <div className={styles.home}>
        <Header />
        <form className={styles.postForm} onSubmit={onSubmit}>
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
                  <img
                    src={imageFile}
                    alt="attachment"
                    width={100}
                    height={100}
                  />
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

            <button className={styles.postForm__btn} disabled={isSubmitting}>
              수정
            </button>
          </div>
        </form>
      </div>
      <Search isHome={true} />
    </>
  );
}
