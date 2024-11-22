import { io, Socket } from 'socket.io-client'

let socket: Socket | null = null;

/**
 * Connects to the WebSocket server and returns the socket instance.
 * @param url The WebSocket server URL (e.g., "http://localhost:6000").
 */
export const connectSocket = (url: string): Socket => {
    if (!socket) {
        socket = io(url, {
            transports: ["websocket"],
            reconnection: true,
        })
    }

    socket.on("connect", () => {
        console.log("WebSocket connected:", socket?.id)
    })

    socket.on("disconnect", () => {
        console.log("WebSocket disconnected");
    });

    socket.on("connect_error", (err) => {
        console.error("WebSocket connection error:", err.message);
    });
    return socket;
};

/**
 * Returns the active socket instance.
 * Throws an error if no socket connection exists.
 */
export const getSocket = (): Socket => {
    if (!socket) {
        throw new Error("Socket not connected. Call connectSocket() first.");
    }
    return socket;
};

/**
 * Disconnects the WebSocket connection and clears the socket instance.
 */
export const disconnectSocket = () => {
    if (socket) {
        socket.disconnect();
        socket = null;
        console.log("WebSocket connection closed");
    }
};