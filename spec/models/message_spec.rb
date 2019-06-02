require 'rails_helper'

RSpec.describe Message, type: :model do
  describe "#create" do
    context "can save" do
      it "is valid with context" do
        expect(build(:message, image: nil)).to be_valid
      end
      it "is valid with image" do
        expect(build(:message, content: nil)).to be_valid
      end
      it "is valid with context and image" do
        expect(build(:message)).to be_valid
      end
    end

    context "can't save" do
      it "is invalid blank" do
        message = build(:message, content: nil, image: nil)
        message.valid?
        expect(message.errors[:content]).to include('translation missing: ja.activerecord.errors.models.message.attributes.content.blank')
      end

      it "is invalid blank user_id nothing" do
        message = build(:message, user_id: nil)
        message.valid?
        expect(message.errors[:user]).to include("translation missing: ja.activerecord.errors.models.message.attributes.user.required")
      end
    end
  end
end