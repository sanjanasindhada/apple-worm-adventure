
export function playSound(name) {
    const audio = new Audio(`/sounds/${name}.mp3`);
    audio.volume = 0.6;

    audio.play().catch((error) => {
        console.log("Sound play nahi hua:", error);
    });
}
export function playClickSound() {
    const audio = new Audio("/sounds/click.mp3");
    audio.volume = 0.4;

    audio.play().catch(() => { });
}
export function playMoveSound() {
    const audio = new Audio("/sounds/move.mp3");
    audio.volume = 0.25;

    audio.play().catch(() => {});
}