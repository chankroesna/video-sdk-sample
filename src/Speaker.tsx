function SpeakerView() {
  // Get the Participant Map and meetingId
  const { meetingId, participants } = useMeeting({});

  // For getting speaker participant, filter out `CONFERENCE` mode participant
  const speakers = useMemo(() => {
    const speakerParticipants = [...participants.values()].filter(
      (participant) => {
        return participant.mode == Constants.modes.CONFERENCE;
      }
    );
    return speakerParticipants;
  }, [participants]);

  return (
    <SafeAreaView style={{ backgroundColor: "black", flex: 1 }}>
      {/* Render Header for copy meetingId and leave meeting*/}
      <HeaderView />

      {/* Render Participant List */}
      {speakers.length > 0 ? (
        <FlatList
          data={speakers}
          renderItem={({ item }) => {
            return <ParticipantView participantId={item.id} />;
          }}
        />
      ) : null}

      {/* Render Controls */}
      <Controls />
    </SafeAreaView>
  );
}

function HeaderView() {
  const { meetingId, leave } = useMeeting();
  return (
    <View
      style={{
        flexDirection: "row",
        padding: 16,
        justifyContent: "space-evenly",
        alignItems: "center",
      }}
    >
      <Text style={{ fontSize: 24, color: "white" }}>{meetingId}</Text>
      <Button
        btnStyle={{
          borderWidth: 1,
          borderColor: "white",
        }}
        onPress={() => {
          Clipboard.setString(meetingId);
          alert("MeetingId copied successfully");
        }}
        buttonText={"Copy MeetingId"}
        backgroundColor={"transparent"}
      />
      <Button
        onPress={() => {
          leave();
        }}
        buttonText={"Leave"}
        backgroundColor={"#FF0000"}
      />
    </View>
  );
}

function Container(){
  ...

  const mMeeting = useMeeting({
    onMeetingJoined: () => {
      // Pin the local participant if he joins in CONFERENCE mode
      if (mMeetingRef.current.localParticipant.mode == "CONFERENCE") {
        mMeetingRef.current.localParticipant.pin();
      }
    }
  });

  // Create a ref to meeting object so that when used inside the
  // Callback functions, meeting state is maintained
  const mMeetingRef = useRef(mMeeting);
  useEffect(() => {
    mMeetingRef.current = mMeeting;
  }, [mMeeting]);

  return <>...</>;
}