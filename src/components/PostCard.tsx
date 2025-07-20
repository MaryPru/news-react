import {Card, Tag} from 'antd';
import {FC} from 'react';
import {Reactions} from "../features/posts/types";
import {LikeOutlined, DislikeOutlined} from '@ant-design/icons';

interface Props {
    title: string;
    body: string;
    tags: string[];
    reactions: Reactions;
}

export const PostCard: FC<Props> = ({title, body, tags, reactions}) => (
    <Card title={title}
          style={{
              textAlign: 'left'
          }}
          extra={
              <div style={{display: 'flex', gap: '12px', alignItems: 'center', fontSize: '16px'}}>
                  {reactions.likes > 0 && (
                      <span>
                          <LikeOutlined style={{color: '#1890ff'}}/>
                          {reactions.likes}
                      </span>
                  )}
                  {reactions.dislikes > 0 && (
                      <span>
                          <DislikeOutlined style={{color: '#ff4d4f'}}/>
                          {reactions.dislikes
                          }</span>
                  )}
              </div>
          }
    >
        <p style={{
            overflow: 'hidden',
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            lineHeight: '1.5em',
            maxHeight: '4.5em',
            textOverflow: 'ellipsis',
        }}>
            {body}
        </p>
        <div style={{marginTop: '8px'}}>
            {tags.map((tag) => (
                <Tag key={tag}>{tag}</Tag>
            ))}
        </div>
    </Card>
);
