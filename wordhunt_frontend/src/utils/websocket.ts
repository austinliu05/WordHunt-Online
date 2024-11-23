import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export const connectSocket = (serverURL: string): Promise<Socket> => {
    return new Promise((resolve, reject) => {
        if (!socket) {
            socket = io(serverURL);

            socket.on("connect", () => {
                console.log(`Connected to WebSocket server: ${socket?.id}`);
                resolve(socket as Socket); // Resolve the promise when connected
            });

            socket.on("connect_error", (error) => {
                console.error("Connection error:", error);
                reject(error);
            });

            socket.on("disconnect", () => {
                console.log("Disconnected from WebSocket server");
            });
        } else {
            resolve(socket); // If already connected, resolve immediately
        }
    });
};

export const getSocket = (): Socket => {
    if (!socket) {
        throw new Error("Socket not connected. Call connectSocket() first.");
    }
    return socket;
};

export const disconnectSocket = (): void => {
    if (socket) {
        socket.disconnect();
        socket = null;
    }
};
