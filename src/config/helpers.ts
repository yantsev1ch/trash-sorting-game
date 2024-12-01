export const preloadImages = async (imagePaths: string[]): Promise<void> => {
    await Promise.all(
        imagePaths.map(
            (src) =>
                new Promise((resolve, reject) => {
                    const img = new Image();
                    img.src = src;
                    img.onload = resolve;
                    img.onerror = reject;
                })
        )
    );
};
