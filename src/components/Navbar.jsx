import React, { useEffect ,useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchConversations } from '../redux/conversationsSlice';
import '../style/Navbar.css';
import { Dialog, DialogTitle, DialogContent, List, ListItem, ListItemText, Collapse, Typography, CircularProgress } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';

function Navbar() {
    const dispatch = useDispatch();
    const { conversations, loading } = useSelector((state) => state.conversations);
    const [openDialog, setOpenDialog] = useState(false);
    const [expandedChat, setExpandedChat] = useState(null);

    useEffect(() => {
        if (conversations.length === 0) {
            dispatch(fetchConversations());
        }
    }, [dispatch, conversations.length]);

    const handleViewChats = () => {
        setOpenDialog(true);
    };

    const handleClose = () => {
        setOpenDialog(false);
    };

    const toggleExpand = (id) => {
        setExpandedChat(expandedChat === id ? null : id);
    };

    return (
        <nav className="navbar">
            <div className="navbar-title">AI Chat Application</div>
            <div className="navbar-links">
                <button className="navbar-button" onClick={handleViewChats} disabled={loading}>
                    {loading ? 'Loading...' : 'View Previous Chats'}
                </button>
            </div>

            <Dialog open={openDialog} onClose={handleClose} fullWidth maxWidth="sm">
                <DialogTitle>Previous Conversations</DialogTitle>
                <DialogContent>
                    {loading ? (
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
                            <CircularProgress />
                        </div>
                    ) : (
                        <List>
                            {conversations.length === 0 ? (
                                <ListItem><ListItemText primary="No previous chats found." /></ListItem>
                            ) : (
                                conversations.map((chat) => (
                                    <div key={chat.id}>
                                        <ListItem button onClick={() => toggleExpand(chat.id)}>
                                            <ListItemText primary={`Conversation: ${chat.id?chat.id:'new conversation'}`} />
                                            {expandedChat === chat.id ? <ExpandLess /> : <ExpandMore />}
                                        </ListItem>
                                        <Collapse in={expandedChat === chat.id} timeout="auto" unmountOnExit>
                                            <List component="div" disablePadding>
                                            {chat.messages?.map((msg, index) => (
                                            <ListItem key={index} style={{ paddingLeft: '2rem' }}>
                                                <ListItemText primary={`${msg.sender}: ${msg.text}`} />
                                            </ListItem>
                                        ))}
                                                {chat.feedback && (
                                                    <div style={{ paddingLeft: '2rem', marginTop: '1rem' }}>
                                                        <Typography variant="subtitle1"><strong>Feedback:</strong></Typography>
                                                        <Typography variant="body2">{`Rating: ${chat.feedback.rating}`}</Typography>
                                                        <Typography variant="body2">{`Comments: ${chat.feedback.feedback}`}</Typography>
                                                    </div>
                                                )}
                                            </List>
                                        </Collapse>
                                    </div>
                                ))
                            )}
                        </List>
                    )}
                </DialogContent>
            </Dialog>
        </nav>
    );
}

export default Navbar;
