import React from 'react'
import axios from 'axios'
import { SafeAreaView, StatusBar } from 'react-native'
import { useState, useCallback, useEffect } from 'react'
import { GiftedChat, Bubble, Time } from 'react-native-gifted-chat'

function App() {
  const [messages, setMessages] = useState([]);

  const chatbotAvatarUrl = 'https://cdn-icons-png.flaticon.com/512/7407/7407037.png'
  const userAvatarUrl = 'https://cdn-icons-png.flaticon.com/512/7622/7622626.png'
  
  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Merhaba ben Aybüs. Size nasıl yardımcı olabilirim?',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'Aybüs',
          avatar: chatbotAvatarUrl,
        },
      },
    ])
  }, [])

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, {
      _id: Math.round(Math.random() * 1000000),
      text: messages[0].text,
      createdAt: new Date(),
      user: {
        _id: 1,
        name: 'Misafir',
        avatar: userAvatarUrl,
      },
    }))
    if (messages[0].text.toLowerCase() === 'merhaba') {
      setMessages(previousMessages => GiftedChat.append(previousMessages, {
        _id: Math.round(Math.random() * 1000000),
        text: 'Merhaba. Size nasıl yardımcı olabilirim?',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'Aybüs',
          avatar: chatbotAvatarUrl,
        },
      }))
    } else if (messages[0].text.toLocaleLowerCase('tr-TR') === 'görüşürüz') {
      setMessages(previousMessages => GiftedChat.append(previousMessages, {
        _id: Math.round(Math.random() * 1000000),
        text: 'Görüşürüz.',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'Aybüs',
          avatar: chatbotAvatarUrl,
        },
      }))
    } else {
      axios.post('http://192.168.43.149:8080', {
        question: messages[0].text
      }).then(res => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, {
          _id: Math.round(Math.random() * 1000000),
          text: res.data['answer'],
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'Aybüs',
            avatar: chatbotAvatarUrl,
          },
        }))
      }).catch(err => {
        console.log(err)
      });
    }
  }, [])

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <GiftedChat
        user = {{ _id: 1 }}
        messages = { messages }
        textInputStyle = {{ color: '#000' }}
        onSend = { messages => onSend(messages) }
        textInputProps = {{
          placeholder: 'Sorunuzu buraya yazınız...',
        }}
        dateFormat = {'DD MMM YYYY'}
        timeFormat = {'HH:mm'}
        renderAvatarOnTop = {true}
        showUserAvatar = {true}
        renderBubble={props => {
          return (
            <Bubble
              {...props}
              textStyle={{
                right: {
                  color: 'white',
                },
                left: {
                  color: 'black',
                },
              }}
              wrapperStyle={{
                left: {
                  borderWidth: 1,
                  borderColor: '#d3d3d3',
                  backgroundColor: '#E6F5F3',
                },
                right: {
                  borderWidth: 1,
                  borderColor: '#3a0ca3',
                  backgroundColor: "#4361EE",
                },
              }}
            />
          );
        }}
        renderTime={props => {
          return (
            <Time 
              {...props}
              timeTextStyle={{
                right: {
                  color: 'white',
                },
                left: {
                  color: 'black',
                },
              }}
            />
          )
        }} 
      />
    </SafeAreaView>
  )
}

export default App;