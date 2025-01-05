

export async function* streamGenerator(
    reader: ReadableStreamDefaultReader<Uint8Array>
): AsyncGenerator<string, void, unknown> {
    const decoder = new TextDecoder();
    let buffer = '';

    while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');

        // Process all complete lines except the last one
        for (let i = 0; i < lines.length - 1; i++) {
            const line = lines[i].trim();
            if (line) {
                try {
                    const parsed = JSON.parse(line);
                    if (parsed.type === 'message') {
                        yield parsed.content;
                    }
                } catch (e) {
                    console.error('Error parsing JSON:', e);
                }
            }
        }

        // Keep the last (potentially incomplete) line in the buffer
        buffer = lines[lines.length - 1];
    }

    // Process any remaining content in the buffer
    if (buffer.trim()) {
        try {
            const parsed = JSON.parse(buffer);
            if (parsed.type === 'message') {
                yield parsed.content;
            }
        } catch (e) {
            console.error('Error parsing final JSON:', e);
        }
    }
}