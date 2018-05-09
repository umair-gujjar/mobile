# RNHotels

## Usage

```
bundle install
pod update && pod install
```

You can try this locally inside the `Example` folder.

## Installation

RNHotels is available through [CocoaPods](https://cocoapods.org). To install
it, simply add the following line to your Podfile:

```ruby
# Change the tag for getting different versions of the app
pod 'RNHotelsSpec', git: => 'https://github.com/kiwicom/mobile.git', tag: => '0.0.23'
```

## Make new release

1. Generate new `RNHotels.js` bundle file under `Pod/Assets`:
```bash
./build.sh
```

2. Commit changes

3. Push a new tag (to match version of `app/hotels/package.json`):

```bash
git tag <tag_name> master
git push origin <tag_name>
```

## Updating react-native or native dependencies

Our native dependencies specs are in gitlab: [react-native-native-modules](https://gitlab.skypicker.com/mobile/react-native-native-modules). If we want to update React Native or add/update a native dependency, we need to add the definition there plus update [RNHotelsSpec.podspec](RNHotelsSpec.podspec),

