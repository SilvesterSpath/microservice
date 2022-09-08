const CommentList = ({ comments }) => {
  const renderedComments = comments.map((item) => {
    let content;

    if (item.status === 'pending') {
      content = 'Awaiting moderation..';
    }
    if (item.status === 'approved') {
      content = item.content;
    }
    if (item.status === 'rejected') {
      content = 'Has been rejected';
    }

    return <li key={item.id}>{content}</li>;
  });

  return <ul>{renderedComments}</ul>;
};

export default CommentList;
