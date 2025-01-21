// api/uploadFile.ts
export const uploadFile = async (file: File): Promise<{ success: boolean; message?: string; chunks?: number; error?: string }> => {
    try {
        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/upload`, {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ detail: response.statusText }));
            throw new Error(errorData.detail || `Upload failed: ${response.statusText}`);
        }

        const data = await response.json();
        return {
            success: true,
            message: data.message,
            chunks: data.chunks
        };
    } catch (error) {
        console.error('Error uploading file:', error);
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Failed to upload file',
        };
    }
};