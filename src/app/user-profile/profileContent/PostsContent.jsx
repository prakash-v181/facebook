import React, { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { MessageCircle, MoreHorizontal, Share2, ThumbsUp } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import PostComments from "@/app/posts/PostComments";
import { formatDateInDDMMYYY } from "@/lib/utils"; // 🔹 FIXED import

const PostsContent = ({ post, isLiked, onShare, onComment, onLike }) => {
  const [showComments, setShowComments] = useState(false);
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);
  const commentInputRef = useRef(null);

  const userPlaceholder = post?.user?.username
    ?.split(" ")
    .map((name) => name[0])
    .join("");

  const handleCommentClick = () => {
    setShowComments(!showComments);
    setTimeout(() => commentInputRef.current?.focus(), 200);
  };

  const generateSharedLink = () => {
    return `${window.location.origin}/posts/${post?._id}`;
  };

  const handleShare = (platform) => {
    const url = generateSharedLink();
    let shareUrl;

    switch (platform) {
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
        break;
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?url=${url}`;
        break;
      case "linkedin":
        shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${url}`;
        break;
      case "copy":
        navigator.clipboard.writeText(url);
        setIsShareDialogOpen(false);
        return;
      default:
        return;
    }

    window.open(shareUrl, "_blank");
    setIsShareDialogOpen(false);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      <Card>
        <CardContent className="p-6 dark:text-white">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3 cursor-pointer">
              <Avatar>
                {post?.user?.profilePicture ? (
                  <AvatarImage src={post?.user?.profilePicture} alt={post?.user?.username} />
                ) : (
                  <AvatarFallback>{userPlaceholder}</AvatarFallback>
                )}
              </Avatar>

              <div>
                <p className="font-semibold dark:text-white">{post?.user?.username}</p>
                <p className="text-gray-400 text-sm">{formatDateInDDMMYYY(post?.createdAt)}</p>
              </div>
            </div>

            <Button variant="ghost">
              <MoreHorizontal className="h-5 w-5 dark:text-gray-200" />
            </Button>
          </div>

          {/* Content */}
          <p className="mb-4">{post?.content}</p>

          {post?.mediaUrl && post.mediaType === "image" && (
            <img src={post?.mediaUrl} className="w-full rounded-lg mb-4" />
          )}

          {post?.mediaUrl && post.mediaType === "video" && (
            <video controls className="w-full rounded-lg mb-4">
              <source src={post?.mediaUrl} />
            </video>
          )}

          {/* Like + Comment count */}
          <div className="flex justify-between mb-3 text-gray-500 text-sm dark:text-gray-400">
            <span>{post?.likeCount} Likes</span>
            <span className="cursor-pointer" onClick={handleCommentClick}>
              {post?.commentCount} Comments
            </span>
            <span>{post?.shareCount} Shares</span>
          </div>

          <Separator className="mb-3 dark:bg-gray-500" />

          {/* Buttons */}
          <div className="flex justify-between gap-2">
            <Button variant="ghost" onClick={onLike} className={`flex-1 ${isLiked ? "text-blue-500" : ""}`}>
              <ThumbsUp className="mr-2 h-4 w-4" />
              Like
            </Button>

            <Button variant="ghost" onClick={handleCommentClick} className="flex-1">
              <MessageCircle className="mr-2 h-4 w-4" />
              Comment
            </Button>

            <Dialog open={isShareDialogOpen} onOpenChange={setIsShareDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex-1"
                  onClick={() => setIsShareDialogOpen(true)}
                >
                  <Share2 className="mr-2 h-4 w-4" />
                  Share
                </Button>
              </DialogTrigger>

              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Share This Post</DialogTitle>
                  <DialogDescription>Select a platform to share</DialogDescription>
                </DialogHeader>

                <div className="space-y-3">
                  <Button onClick={() => handleShare("facebook")}>Facebook</Button>
                  <Button onClick={() => handleShare("twitter")}>Twitter</Button>
                  <Button onClick={() => handleShare("linkedin")}>LinkedIn</Button>
                  <Button onClick={() => handleShare("copy")}>Copy Link</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <Separator className="my-3 dark:bg-gray-500" />

          {/* Comments */}
          <AnimatePresence>
            {showComments && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
              >
                <PostComments post={post} onComment={onComment} commentInputRef={commentInputRef} />
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default PostsContent;




// import React, { useRef, useState } from 'react'
// import { AnimatePresence, motion } from 'framer-motion'
// import { Card, CardContent } from '@/components/ui/card'
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Button } from '@/components/ui/button';
// import { MessageCircle, MoreHorizontal, Share2, ThumbsUp } from 'lucide-react';
// import { Separator } from '@/components/ui/separator';
// import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
// import PostComments from '@/app/posts/PostComments';
// import { formateDate } from '@/lib/utils';

// const PostsContent = ({post,isLiked,onShare,onComment,onLike}) => {
//     const [showComments,setShowComments] = useState(false)
//     const [isShareDialogOpen,setIsShareDialogOpen] = useState(false)
//     const commentInputRef = useRef(null)
     
//     const userPlaceholder = post?.user?.username ?.split(" ").map((name) => name[0]).join("");

//      const handleCommentClick = () =>{
//       setShowComments(true)
//       setTimeout(() =>{
//         commentInputRef.current?.focus();
//       },0)
//      }

//     const generateSharedLink = () =>{
//         return `http://localhost:3000/${post?.id}`
//     }
//     const handleShare= (platform) =>{
//           const url = generateSharedLink()
//           let shareUrl ;
//           switch(platform) {
//             case 'facebook':
//                 shareUrl = `https://www.facebook.com/sharer/sharer.php?u=}`;
//                 break;
//               case 'twitter':
//                 shareUrl = `https://twitter.com/intent/tweet?url=}`;
//                 break;
//               case 'linkedin':
//                 shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=}`;
//                 break;
//                 case 'copy':
//                     navigator.clipboard.writeText(url)
//                     setIsShareDialogOpen(false)
//                     return;
//                     default:
//                         return;
//           }
//           window.open(shareUrl,'_blank');
//           setIsShareDialogOpen(false)

//     }
//   return (
//     <motion.div
//     key={post?._id}
//     initial={{ opacity: 0, y:20 }}
//     animate={{ opacity: 1,y:0 }}
//      transition={{duration:0.5}}
 
//  >
//     <Card>
//         <CardContent className="p-6  dark:text-white ">
//              <div className='flex items-center justify-between mb-4'>
//                 <div className='flex items-center space-x-3 cursor-pointer'>
//                 <Avatar>
//                 {post?.user?.profilePicture ? (
//                             <AvatarImage
//                               src={post?.user?.profilePicture}
//                               alt={post?.user?.username}
//                             />
//                           ) : (
//                             <AvatarFallback className="dark:bg-gray-400">{userPlaceholder}</AvatarFallback>
//                           )}
//             </Avatar>
//             <div >
//                   <p className='font-semibold dark:text-white'>{post?.user?.username}</p>
//                   <p className='font-sm text-gray-500'>{formateDate(post?.createdAt)}</p>
//             </div>
//                 </div>
//                 <Button variant="ghost" className="dark:hover:bg-gray-500">
//                     <MoreHorizontal className='dark:text-white h-4 w-4'/>
//                 </Button>
//              </div>
//              <p className='mb-4'>{post?.content}</p>
//              {post?.mediaUrl && post.mediaType === 'image' && (
//                 <img
//                   src={post?.mediaUrl}
//                   alt='post_image'
//                   className='w-full h-auto rounded-lg mb-4'
//                 />
//              )}
//              {post?.mediaUrl && post.mediaType === 'video' && (
//                 <video controls className='w-full h-[500px] rounded-lg mb-4'>
//                     <source src={post?.mediaUrl} type='video/mp4'/>
//                     Your browser does not support the video tag
//                 </video>
//              )}
//              <div className='flex justify-between items-center mb-4'>
//                 <span className='text-sm text-gray-500 dark:text-gray-400 hover:border-b-2 border-gray-400 cursor-pointer '>{post?.likeCount} likes</span>
//                 <div className='flex gap-3'>
//                 <span className='text-sm text-gray-500 dark:text-gray-400 hover:border-b-2 border-gray-400 cursor-pointer ' onClick={() => setShowComments(!showComments)}>{post?.commentCount}  comments</span>
//                 <span className='text-sm text-gray-500 dark:text-gray-400 hover:border-b-2 border-gray-400 cursor-pointer '>{post?.shareCount}  share</span>
//                 </div>
//              </div>
//              <Separator className="mb-2 dark:bg-gray-400"/>
//              <div className='flex justify-between mb-2'>
//                      <Button
//                       variant="ghost" className={`flex-1 dark:hover:bg-gray-600 ${isLiked ? "text-blue-600" : ""}`}
//                       onClick={onLike}
//                      >
//                       <ThumbsUp className='mr-2 h-4 w-4'/> Like
//                      </Button>
//                      <Button
//                       variant="ghost" className={`flex-1 dark:hover:bg-gray-600 `}
//                       onClick={handleCommentClick}
//                      >
//                       <MessageCircle className='mr-2 h-4 w-4'/> Comment
//                      </Button>
//                      <Dialog open={isShareDialogOpen} onOpenChange={setIsShareDialogOpen}>
//                         <DialogTrigger asChild>
//                            <Button variant="ghost" className="flex-1 dark:hover:bg-gray-500"  onClick={onShare}>
//                                 <Share2 className='mr-2 h-4 w-4'/>
//                                 share
//                            </Button>
//                         </DialogTrigger>
//                         <DialogContent>
//                             <DialogHeader>
//                                 <DialogTitle>Share This Post</DialogTitle>
//                                 <DialogDescription>Choose how you want to share this post</DialogDescription>
//                             </DialogHeader>
//                             <div className='flex flex-col space-y-4 '>
//                                  <Button onClick= {() => handleShare('facebook')}>Share on Facebook</Button>
//                                  <Button onClick= {() => handleShare('twitter')}>Share on Twitter</Button>
//                                  <Button onClick= {() => handleShare('linkedin')}>Share on Linkedin</Button>
//                                  <Button onClick= {() => handleShare('copy')}>Copy Link</Button>
//                             </div>
//                         </DialogContent>
//                      </Dialog>
//              </div>
//              <Separator className="mb-2 dark:bg-gray-400"/>
//              <AnimatePresence>
//                 {showComments && (
//                     <motion.div
//                     initial={{ opacity: 0, height: 0 }}
//                     animate={{ opacity: 1, height: "auto" }}
//                     exit={{ opacity: 0, height: 0 }}
//                     transition={{duration:0.3}}

//                     >
//                         <PostComments
//                            post={post}
//                            onComment={onComment}
//                            commentInputRef={commentInputRef}
//                         />
                        
//                     </motion.div>
//                 )}
//              </AnimatePresence>

//         </CardContent>
//     </Card>
   
//  </motion.div>
//   )
// }

// export default PostsContent