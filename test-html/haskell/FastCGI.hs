module FastCGI ( main ) where

import Control.Concurrent
import Network.FastCGI

action :: CGI CGIResult
action = do
    setHeader "Content-type" "text/plain"
    tid <- liftIO myThreadId
    output $ unlines
        [ "I am a FastCGI process!"
        , "Hear me roar!"
        , ""
        , show tid
        ]

main :: IO ()
main = runFastCGIConcurrent' forkIO 10 action
