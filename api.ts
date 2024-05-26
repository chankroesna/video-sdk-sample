export const authToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlrZXkiOiI0MzU5YTkwYi1mNmExLTRmZTYtYmRlOS0yMTdmZWJmZWY3YjUiLCJwZXJtaXNzaW9ucyI6WyJhbGxvd19qb2luIl0sImlhdCI6MTcxNjAyNDI2MywiZXhwIjoxNzE4NjE2MjYzfQ.y3r9AvSPLkzXhDso--7dXXQLeKiDa4_lz4MLk_ylrVU'; // token should be in String format

// API call to create meeting
export const createMeeting = async ({ token }) => {
  const res = await fetch(`https://api.videosdk.live/v2/rooms`, {
    method: "POST",
    headers: {
      authorization: `${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({}),
  });
  const { roomId } = await res.json();
  console.log("room id", roomId);
  return roomId;
};