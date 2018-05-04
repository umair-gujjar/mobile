require 'json'

# Same version as in package.json
pkg_version = lambda do |dir_from_root = '../../../', version = 'version'|
  path = File.join(__dir__, dir_from_root, 'app', 'hotels', 'package.json')
  JSON.parse(File.read(path))[version]
end

kiwi_mobile_version = pkg_version.call

# Use the same RN version that the JS tools use (global package.json)
pkg_version_global = lambda do |dir_from_root = '../../../'|
  path = File.join(__dir__, dir_from_root, 'package.json')
  JSON.parse(File.read(path))['dependencies']['react-native']
end

react_native_version = pkg_version_global.call

Pod::Spec.new do |s|
  s.name             = 'RNHotels'
  s.version          = kiwi_mobile_version
  s.description      = 'Components for RNHotels.'
  s.summary          = 'Components for RNHotels.'
  s.homepage         = 'https://github.com/kiwicom/mobile'
  s.license          = { type: 'MIT', file: 'LICENSE' }
  s.author           = { 'ferrannp' => 'fnp.developer@gmail.com' }
  s.source           = { git: 'https://github.com/kiwicom/mobile/tree/master/native/ios/RNHotels', tag: s.version.to_s }

  s.source_files   = 'Pod/Classes/**/*.{h,m}'
  s.resources      = 'Pod/Assets/{RNHotels.js,assets}'
  s.platform       = :ios, '8.0'

  # React is split into a set of subspecs, these are the essentials
  s.dependency 'React/Core', react_native_version
  s.dependency 'React/CxxBridge', react_native_version
  s.dependency 'React/RCTAnimation', react_native_version
  s.dependency 'React/RCTImage', react_native_version
  s.dependency 'React/RCTLinkingIOS', react_native_version
  s.dependency 'React/RCTNetwork', react_native_version
  s.dependency 'React/RCTText', react_native_version

  # React's dependencies
  s.dependency 'yoga', "#{react_native_version}.React"
  podspecs = [
    '../../../node_modules/react-native/third-party-podspecs/DoubleConversion.podspec',
    '../../../node_modules/react-native/third-party-podspecs/Folly.podspec',
    '../../../node_modules/react-native/third-party-podspecs/glog.podspec',
    '../../../node_modules/@kiwicom/react-native-native-modules/RNLogging.podspec',
    '../../../node_modules/@kiwicom/react-native-native-modules/RNTranslationManager.podspec',
    '../../../node_modules/@kiwicom/react-native-native-modules/RNColors.podspec',
    '../../../node_modules/@kiwicom/react-native-native-modules/RNCurrencyManager.podspec',
    '../../../node_modules/@kiwicom/react-native-native-modules/RNDeviceInfo.podspec',
    '../../../node_modules/react-native-maps/react-native-maps.podspec',
    '../../../node_modules/react-native-vector-icons/RNVectorIcons.podspec'
  ]
  
  podspecs.each do |podspec_path|
    spec = Pod::Specification.from_file podspec_path
    s.dependency spec.name, "#{spec.version}"
  end
end