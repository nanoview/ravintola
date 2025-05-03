
export interface PostPreviewProps {
  title: string;
  content: string;
}

export function PostPreview({ title, content }: PostPreviewProps) {
  return (
    <div className="bg-white p-8 shadow rounded-md max-w-3xl mx-auto">
      <div className="prose mx-auto">
        <h1 className="text-3xl font-bold mb-6">{title || 'Untitled Post'}</h1>
        <div className="whitespace-pre-wrap">
          {content || 'No content to preview.'}
        </div>
      </div>
    </div>
  );
}
