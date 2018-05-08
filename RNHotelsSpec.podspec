require 'json'

# Same version as in package.json
packageJson = lambda do |dir_from_root = ''|
  path = File.join(__dir__, dir_from_root, 'app', 'hotels', 'package.json')
  JSON.parse(File.read(path))
end

pkg_version = packageJson.call['version']
kiwi_mobile_version = pkg_version
react_native_maps_version = packageJson.call['dependencies']['react-native-maps']

sharedPackageJson = lambda do |dir_from_root = ''|
  path = File.join(__dir__, dir_from_root, 'app', 'shared', 'package.json')
  JSON.parse(File.read(path))
end

react_native_vector_icons = sharedPackageJson.call['dependencies']['react-native-vector-icons']

# Use the same RN version that the JS tools use (global package.json)
globalPackageJson = lambda do |dir_from_root = ''|
  path = File.join(__dir__, dir_from_root, 'package.json')
  JSON.parse(File.read(path))
end

react_native_version = globalPackageJson.call['dependencies']['react-native']

Pod::Spec.new do |s|
  s.name             = 'RNHotelsSpec'
  s.version          = kiwi_mobile_version
  s.description      = 'Components for RNHotels.'
  s.summary          = 'Components for RNHotels.'
  s.homepage         = 'https://github.com/kiwicom/mobile'
  s.license          = { type: 'MIT', file: 'LICENSE' }
  s.author           = { 'ferrannp' => 'fnp.developer@gmail.com' }
  s.source           = { git: 'https://github.com/kiwicom/mobile.git', tag: s.version.to_s }

  s.source_files   = 'native/ios/RNHotels/Pod/Classes/**/*.{h,m}'
  s.resources      = 'native/ios/RNHotels/Pod/Assets/{RNHotels.js,assets}'
  s.platform       = :ios, '9.0'

  # React is split into a set of subspecs, these are the essentials
  s.dependency 'React/Core', react_native_version
  s.dependency 'React/CxxBridge', react_native_version
  s.dependency 'React/RCTAnimation', react_native_version
  s.dependency 'React/RCTImage', react_native_version
  s.dependency 'React/RCTLinkingIOS', react_native_version
  s.dependency 'React/RCTNetwork', react_native_version
  s.dependency 'React/RCTText', react_native_version
  s.dependency 'React/RCTGeolocation', react_native_version
  s.dependency 'React/DevSupport', react_native_version

  # React's dependencies
  s.dependency 'yoga', "#{react_native_version}.React"
  
  s.dependency 'RNLogging'
  s.dependency 'RNTranslationManager'
  s.dependency 'RNColors'
  s.dependency 'RNCurrencyManager'
  s.dependency 'RNDeviceInfo'
  
  # Native modules
  s.dependency 'react-native-maps', react_native_maps_version
  s.dependency 'RNVectorIcons', react_native_vector_icons
end
