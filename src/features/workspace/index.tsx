import { useState } from 'react';
import { ChatSidebar } from './components/chat-sidebar';
import { ChatArea } from './components/chat-area';

const Index = () => {
  const [currentProject, setCurrentProject] = useState<Project>(projects[0]);
  const [activeChannel, setActiveChannel] = useState<Channel>(
    getChannelsByProject(projects[0].id)[0]
  );
  const [activeDM, setActiveDM] = useState<DirectMessage | undefined>();

  const handleProjectChange = (project: Project) => {
    setCurrentProject(project);
    const projectChannels = getChannelsByProject(project.id);
    if (projectChannels.length > 0) {
      setActiveChannel(projectChannels[0]);
    }
    setActiveDM(undefined);
  };

  const handleChannelSelect = (channel: Channel) => {
    setActiveChannel(channel);
    setActiveDM(undefined);
  };

  const handleDMSelect = (dm: DirectMessage) => {
    setActiveDM(dm);
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      <ChatSidebar
        currentProject={currentProject}
        activeChannelId={activeChannel.id}
        activeDMId={activeDM?.id}
        onProjectChange={handleProjectChange}
        onChannelSelect={handleChannelSelect}
        onDMSelect={handleDMSelect}
      />
      <ChatArea channel={activeChannel} />
    </div>
  );
};

export default Index;
