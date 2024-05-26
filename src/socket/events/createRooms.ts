type SuccessfulSocketRes = {
    didCreate:boolean,
    roomId:string,
    name: string,
    difficulty: number,
    isAllowedChat: boolean,
    time: string,
};
export default function createRoom(showErrorAlert:(text: string) => void){
    return (data:SuccessfulSocketRes) => {
        console.log(data);
    }
}