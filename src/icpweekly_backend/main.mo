import Result "mo:base/Result";
import Text "mo:base/Text";
import Bool "mo:base/Bool";
import HashMap "mo:base/HashMap";
import Iter "mo:base/Iter";
import Time "mo:base/Time";


actor {
  type Subscriber = {
    email: Text;
    subscribed: Bool
  };

  type PostStatus = { 
    draft: Bool;
    published: Bool;
    scheduled: Bool;
  };

 type Post = {
  title: Text;
  content: Text;
  scheduled: Time.Time;
  author: Text;
  status: PostStatus;
};
  // I want to save the subscribers in stable memory
  let subscribers = HashMap.HashMap<Text, Subscriber>(0, Text.equal, Text.hash);
    // I want to save the post in stable memory 
  let posts = HashMap.HashMap<Text, Post>(0, Text.equal, Text.hash);

  // subscription functions
  public func subscribe(email: Text): async Result.Result<(), Text> {
    let _subscriber = subscribers.get(email);
      switch(_subscriber) {
        case(?_subscriber) {
          return #err("User already subscribed");
        };
        case(null) {
          subscribers.put(email, { email = email; subscribed = true });
          return #ok()
        };
      };
  };

  public func getSubscribers(): async [Subscriber] {
    return Iter.toArray(subscribers.vals());
  };

  public query func totalSubcribers(): async Nat {
    return subscribers.size();
  };

  // post functions
  public func createPost(title: Text, content : Text, author: Text, scheduled: Time.Time, status: PostStatus  ): async Result.Result<(), Text> {
    let _post = posts.get(title);
      switch(_post) {
        case(?_post) {
          return #err("Post with title already exist!");
        };
        case(null) {
          posts.put(title, { title = title; author = author; content = content; scheduled = scheduled; status = status});
          return #ok()
        };
      };
  };

  public func getPosts(): async [Post] {
    return Iter.toArray(posts.vals());
  };

  public query func totalPosts(): async Nat {
    return posts.size();
  };
};
