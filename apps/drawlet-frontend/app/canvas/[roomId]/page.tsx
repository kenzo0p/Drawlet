import { RoomCanvas } from "@/components/RoomCanvas";
interface Props {
  params: { roomId: string };
}
const page = async ({ params }: Props) => {
  const roomId = (await params).roomId;

  return (
    <>
      <RoomCanvas roomId={roomId} />
    </>
  );
};

export default page;
