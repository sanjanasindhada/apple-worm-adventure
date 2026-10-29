
export function playSound(name) {
    const audio = new Audio(`/sounds/${name}.mp3`);
    audio.volume = 0.6;

    audio.play().catch((error) => {
        console.log("Sound play nahi hua:", error);
    });
}
