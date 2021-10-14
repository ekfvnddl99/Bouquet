import { useState } from 'react';

// logics
import { viewPostState } from '../atoms';
import { getPostAsync } from '../server/Post';
import useCharacter from './useCharacter';

// utils
import { Post, AllTemplates, noPost } from '../../utils/types/PostTypes';

/**
 * Post Detail에 띄울 게시글 정보를 불러오는 custom hook
 * @returns [viewPost, setViewPost]
 */
export default function useViewPost(): [
  Post<AllTemplates>,
  (postId: number) => Promise<void>,
] {
  const [viewPost, setViewPost] = useState<Post<AllTemplates>>(noPost);
  const [character] = useCharacter();

  async function setViewPostById(postId: number): Promise<void> {
    const result = await getPostAsync(postId);
    if (result.isSuccess) {
      setViewPost(result.result);
    } else alert(result.result.errorMsg);
  }

  return [viewPost, setViewPostById];
}
